import * as fs from "fs";

export default function removeCurrentRevisionMigrations(
  revision,
  migrationsPath,
  options
): Promise<boolean> {
  // if old files can't be deleted, we won't stop the execution

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise<boolean>((resolve, reject) => {
    if (options.keepFiles) resolve(false);

    try {
      const files: string[] = fs.readdirSync(migrationsPath);
      if (files.length === 0) resolve(false);

      let i = 0;
      files.forEach((file) => {
        i += 1;
        if (file.split("-")[0] === revision.toString()) {
          fs.unlinkSync(`${migrationsPath}/${file}`);
          if (options.verbose) {
            console.log(`Successfully deleted ${file}`);
            resolve(true);
          }
        }
        if (i === files.length) resolve(false);
      });
    } catch (err) {
      // if (options.debug) console.error(`Can't read dir: ${err}`);
      // console.log(`Failed to delete mig file: ${error}`);
      if (options.debug) console.error(`Error Occurred: ${err}`);
      resolve(false);
    }
  });
}
