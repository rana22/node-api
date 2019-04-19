INSERT INTO permissions ( id ,  url ,  path ,  method ,  title ,  description ) VALUES

(1, '/permissions', '/', 'GET', 'Get Permissions', 'Get all permissions'),
(2, '/roles', '/', 'GET', 'Get Roles', 'Get all roles'),
(3, '/users', '/', 'GET', 'Get Users', 'Get all users'),
(4, '/users', '/:id', 'GET', 'Get Specific User', 'Get any individual user (any authenticated user can get themselves)'),
(5, '/users', '/', 'POST', 'Create User', 'Create a new user'),
(6, '/users', '/:id', 'PUT', 'Update User', 'Update any user (any authenticated user can update at least some aspects of themselves)'),
(7, '/roles', '/:id', 'GET', 'Get Specific Role', 'Get a specific role by id'),
(8, '/roles', '/', 'POST', 'Create Role', 'Create a role'),
(9, '/roles', '/:id', 'PUT', 'Update Role', 'Update a specific role by id'),
(10, '/jobsites', '/', 'GET', 'Get Job Sites', 'Get all job sites'),
(11, '/jobsites', '/:id', 'GET',  'Get Specific Job Site', 'Get a specific job site by id'),
(12, '/jobsites', '/', 'POST',  'Create Job Site', 'Create a new job site'),
(13, '/jobsites', '/:id', 'PUT', 'Update Job Site', 'Update a specific job site by id'),
(14, '/samples', '/', 'GET', 'Get Samples', 'Get all samples'),
(15, '/samples', '/:id', 'GET',  'Get Specific Sample', 'Get a specific sample by id'),
(16, '/samples', '/', 'POST', 'Create Sample', 'Create a new sample'),
(17, '/samples', '/:id', 'PUT', 'Update Sample', 'Update a specific sample by id')

;