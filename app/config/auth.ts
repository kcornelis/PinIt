/// <reference path='../../typings/all.d.ts' />

module pinIt {
	'use strict';

	class Maps {

		public static $inject = [
			'$authProvider'
		];

		constructor($authProvider: any) {
			$authProvider.google({
				clientId: pinIt.config.auth.google.clientId
			});
		}
	}

	angular.module('pinIt').config(Maps);
}
