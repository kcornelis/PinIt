module pinIt{
	interface IConfig {
		google: {
			apiKey: string
		},
		auth: {
			google: {
				clientId: string
			}
		}
	}

	export var config: IConfig;
}
