module pinIt{
	interface IConfig {
		google: {
			apiKey: string
		}
	}

	export var config: IConfig;
}
