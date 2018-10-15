module.exports = name => {
  let env = process.env.NODE_ENV || "dev";
  let json = `${__dirname}/../config/${name}.${env}.js`;
  return require(json);
}
