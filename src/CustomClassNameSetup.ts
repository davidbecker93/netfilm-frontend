import { unstable_ClassNameGenerator as ClassNameGenerator } from "@mui/material/className";

ClassNameGenerator.configure((componentName) => {
  let newComponentName = componentName;
  // you can replace Mui, default prefix of every component with new one you want
  newComponentName = newComponentName.replace("Mui", "Netfilm");
  // you can replace default classname of component with new one you want
  newComponentName = newComponentName.replace("Button", "Btn");

  return newComponentName;
});
