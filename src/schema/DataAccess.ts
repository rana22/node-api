import Sequelize = require("sequelize");
import Promise = require("bluebird");
var fs = require('fs');

class DataAccess {

    static sequelize: Sequelize.Sequelize;

    constructor () {
        DataAccess.connect();
    }

    public static connect (): Promise<any> {

        //Change to false to stop database reseed
        let devSync = true;

        let RDS_DB = process.env.RDS_DB;
        let RDS_DB_USER = process.env.RDS_DB_USER;
        let RDS_DB_PASS = process.env.RDS_DB_PASS;
        let RDS_DB_HOST = process.env.RDS_DB_HOST;
        let DB_CONNECTION_STRING = "mysql://"+RDS_DB_USER+":"+RDS_DB_PASS+"@"+RDS_DB_HOST+":3306/"+RDS_DB;
        // let DB_CONNECTION_STRING = "jdbc:postgresql://psql:5432/postgres"
        console.log('attempting to connect');
        console.log(DB_CONNECTION_STRING);
        // this.sequelize = new Sequelize(DB_CONNECTION_STRING, {dialect: "mysql", logging: false});
        this.sequelize = new Sequelize( 'postgres', 'postgres', 'postgres',{
            dialect: 'postgres',
            host: 'localhost',
            port: 5432
        });
        
        let dbSynced = this.sequelize.sync({force: devSync, logging: devSync});

        if (devSync) {

            let fkDisabled = dbSynced.then(function(results) {
                return DataAccess.executeSqlSeed('seed/fkDisable.sql');
            });

            let rolesSeeded = fkDisabled.then(function(results){
                return DataAccess.executeSqlSeeds(['seed/roles.sql']);
            });

            let permissionsSeeded = rolesSeeded.then(function(results){
                return DataAccess.executeSqlSeeds(['seed/permissions.sql']);
            });

            let rolePermissionsSeeded = permissionsSeeded.then(function(results){
                // return DataAccess.executeSqlSeeds(['seed/role_permissions.sql']);
            });

            let usersSeeded = rolePermissionsSeeded.then(function(results){
                // return DataAccess.executeSqlSeeds(['seed/users.sql']);
            });

            let userRolesSeeded = usersSeeded.then(function(results){
                // return DataAccess.executeSqlSeeds(['seed/user_roles.sql']);
            });

            let jobSitesSeeded = userRolesSeeded.then(function(results){
                // return DataAccess.executeSqlSeeds(['seed/jobsites.sql']);
            });

            let samplesSeeded = jobSitesSeeded.then(function(results){
                // return DataAccess.executeSqlSeeds(['seed/samples.sql']);
            });

            let testResultsSeeded = samplesSeeded.then(function(results) {
                // return DataAccess.executeSqlSeeds(['seed/testresults.sql']);
            });

            let fkEnabled = testResultsSeeded.then(function(results) {
                // return DataAccess.executeSqlSeed('seed/fkEnable.sql');
            });

            return fkEnabled;

        } else {
            return dbSynced;
        }
    }

    private static executeSqlSeeds(filePaths:Array<string>) : Promise<any> {
        return new Promise(function(resolve) {
            let promises = [];
            for (let filePath of filePaths) {
                promises.push(DataAccess.executeSqlSeed(filePath));
            }
            Promise.all(promises).then(function(results){
                resolve(results);
            }).catch(function(error) {
                console.log(error);
            });
        });
    }

    private static executeSqlSeed(filePath:string) : Promise<any> {
        let sql = DataAccess.sqlFileToString(filePath);
        return DataAccess.sequelize.query(sql);
    }

    private static sqlFileToString(filePath:string) : string {
        let sql = fs.readFileSync(filePath).toString()
            .replace(/(\r\n|\n|\r)/gm," ") // remove newlines
            .replace(/\s+/g, ' '); // excess white space
        return sql;
    }

}

DataAccess.connect();
export = DataAccess;