/// <reference path="./angular.d.ts" />
/// <reference path="./google.maps.d.ts" />

declare module angular.google.maps {
	interface IApiProvider {
		configure(config: { key: string, v: string, libraries: string });
	}

	interface IApiLoader {
		then(callback: () => any);
	}
}