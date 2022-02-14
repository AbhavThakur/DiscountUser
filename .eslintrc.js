module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react"],
    settings: {
        react: {
            version: "detect"
        }
    },
    rules: {
        "no-console": "warn",
        "react/react-in-jsx-scope": "off",
        "react/jsx-filename-extension": [
            1,
            { extensions: [".js", ".jsx", ".ts", ".tsx"] }
        ],
        "react/prop-types": "off"
    }
};
