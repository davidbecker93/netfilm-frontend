import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

export default function Footer() {
  return (
    <Box
      //   direction="row"
      //   alignItems="center"
      //   justifyContent="center"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 150,
        bgcolor: "inherit",
        px: "60px",
      }}
    >
      <Box>
        <Divider>
          <Typography color="grey.700" variant="h6">
            Developed by{" "}
            <Link
              href="https://github.com/davidbecker93/"
              underline="none"
              sx={{ color: "text.primary" }}
              target="_blank"
            >
              David Becker
            </Link>
          </Typography>
        </Divider>
      </Box>
    </Box>
  );
}
