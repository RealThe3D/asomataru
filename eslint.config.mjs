// @ts-check
// NEW Flat Config.
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	{
		rules: {
			semi: 'error',
		},
	}
);
// {
// 	"env": {
// 		"es2021": true,
// 		"node": true
// 	},
// 	"extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
// 	"parser": "@typescript-eslint/parser",
// 	"parserOptions": {
// 		"ecmaVersion": "latest",
// 		"sourceType": "module"
// 	},
// 	"plugins": ["@typescript-eslint"],
// 	"rules": {
// 		"no-var": "error",
// 		"semi": ["error", "always"]
// 	}
// }
