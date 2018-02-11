module.exports = {
  "extends": "airbnb",
  "rules": {
    "no-console": 0,
    "arrow-body-style": ["error", "as-needed"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", "css"] }],
    "react/no-find-dom-node": 0,
    "react/prop-types": [0],
    "no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true }],
    "react/forbid-prop-types": [0],
    "import/extensions": 0,
    "arrow-parens": ["error", "as-needed"],
    "no-return-assign": 0
  },
  "env": {
   "browser": true,
   "node": true
  }
}