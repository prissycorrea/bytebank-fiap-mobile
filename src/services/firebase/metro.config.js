const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Adiciona suporte para extensões de arquivo .cjs
defaultConfig.resolver.sourceExts.push("cjs");

// Desativa temporariamente uma funcionalidade para contornar um bug no Metro
// que afeta a resolução de pacotes do Firebase.
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;
