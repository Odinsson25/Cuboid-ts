enum Punishment {
	None = -1,
	Delete = 0,
	Warn = 1,
	Timeout = 2,
	Kick = 3,
	Ban = 4,
}

enum CheckType {
	Partial = 1,
	Strict = 2,
}

export { Punishment, CheckType };
