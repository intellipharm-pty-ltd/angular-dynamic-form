'use strict';

(function() {

	//---------------------------------------------------
	// User Model
	//---------------------------------------------------

    var UserModel = function(BaseModel) {

		/**
		 * UserModel
		 * @extends BaseModel
		 *
		 * @constructor
		 */
		function UserModel() {}

		/**
		 * User
		 * @extends BaseActiveRecord
		 * @param data
		 * @constructor
		 */
		function User(data) {
			this.id 					= data.id;
			this.email 					= data.email;
			this.username 				= data.username;
			this.user_type 				= data.user_type;
			this.password 				= data.password;
			this.password_confirmation 	= '';
			this.access_token 			= undefined; // FB or G+ access token
			this.access_token_type 		= undefined; // facebook or google
		}

		return BaseModel.extend(UserModel, User);
    };

	UserModel.$inject = ['AngularCakePHPBaseModel'];

    angular.module('App').factory('UserModel', UserModel);
})();
