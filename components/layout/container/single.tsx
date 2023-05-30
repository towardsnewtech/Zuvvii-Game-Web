import { Box } from "@mui/system";
import { ILayout } from "../types";
import Head from "next/head";

const SingleLayout = ({ children, pageTitle, showMeta }: ILayout) => {
  return (
    <Box
      sx={{
        paddingTop:'5rem',
        background:'black',
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {children}
    </Box>
  );
};

export default SingleLayout;
