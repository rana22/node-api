const TYPES = {
    IUserService: Symbol('IUserService'),
    IAuthService: Symbol('IAuthService'),
    IPermissionService: Symbol('IPermissionService'),
    IFileService: Symbol('IFileService'),
    IRoleService: Symbol('IRoleService'),
	IITestResultControllerService: Symbol('IITestResultControllerService'),
	IITestResultService: Symbol('IITestResultService'),
	ITestResultService: Symbol('ITestResultService'),
	ITestResultDaoService: Symbol('ITestResultDaoService'),
	ITestResultModelService: Symbol('ITestResultModelService'),
	ITestResultSchemaService: Symbol('ITestResultSchemaService'),
	ITestResultServiceService: Symbol('ITestResultServiceService'),
	/* INSERT SERVICE */
    IJobSiteService: Symbol('IJobSiteService'),
    ISampleService: Symbol('ISampleService'),
    IUserDao: Symbol('IUserDao'),
    ITokenDao: Symbol('ITokenDao'),
    IPermissionDao: Symbol('IPermissionDao'),
    IRoleDao: Symbol('IRoleDao'),
	IITestResultControllerDao: Symbol('IITestResultControllerDao'),
	IITestResultDao: Symbol('IITestResultDao'),
	ITestResultDao: Symbol('ITestResultDao'),
	ITestResultDaoDao: Symbol('ITestResultDaoDao'),
	ITestResultModelDao: Symbol('ITestResultModelDao'),
	ITestResultSchemaDao: Symbol('ITestResultSchemaDao'),
	ITestResultServiceDao: Symbol('ITestResultServiceDao'),
	/* INSERT DAO */
    IJobSiteDao: Symbol('IJobSiteDao'),
	ISampleDao: Symbol('ISampleDao'),
	
};

export default TYPES;