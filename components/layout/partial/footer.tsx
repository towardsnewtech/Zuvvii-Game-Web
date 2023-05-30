import React from "react";
import Link from "@mui/material/Link";
import discord from "public/assets/discord.webp";
import instagram from "public/assets/instagram.webp";
import twitter from "public/assets/twitter.webp";
import tiktok from "public/assets/tiktok.webp";
import snapchat from "public/assets/snapchat.webp";
import youtube from "public/assets/youtube.webp";
import facebook from "public/assets/facebook.webp";
import reddit from "public/assets/reddit.webp";
import { Box } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateAreas: `"A B"
                            "C C"`,
        alignContent: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: "60px",
        paddingTop: "30px",
        paddingBottom: "20px",
        rowGap: "20px",
        backgroundColor: "black",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridArea: "A",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          padding: "0 0 0 0",
          alignContent: "center",
          justifyContent: "center",
          rowGap: "20px",
          columnGap: "20px",
          margin: "0 20%",
        }}
      >
        <Link
          target="_blank"
          rel="noreferrer"
          sx={{ color: "white", fontFamily: "Helvetica" }}
          href="https://www.zuvvii.com/terms-of-service"
          underline="none"
        >
          Terms of Service
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          sx={{ color: "white", fontFamily: "Helvetica" }}
          href="https://www.zuvvii.com/privacy-policy"
          underline="none"
        >
          Privacy Policy
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          sx={{ color: "white", fontFamily: "Helvetica" }}
          href="https://www.zuvvii.com/community-guidelines"
          underline="none"
        >
          Community Guidelines
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          sx={{ color: "white", fontFamily: "Helvetica" }}
          href="https://www.zuvvii.com/contact"
          underline="none"
        >
          Contact
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          sx={{ color: "white", fontFamily: "Helvetica" }}
          href="https://www.zuvvii.com/faqs"
          underline="none"
        >
          FAQs
        </Link>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridArea: "B",
          gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
          alignContent: "center",
          justifyContent: "center",
          rowGap: "20px",
          margin: "0 10%",
        }}
      >
        <a
          target="_blank"
          rel="noreferrer"
          href="https://discord.com/channels/674248130639691796/674551826254659584"
        >
          <Image width={39} height={39} src={discord.src} alt="discord link" />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/zuvviigaming/"
        >
          <Image
            width={39}
            height={39}
            src={instagram.src}
            alt="instagram link"
          />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/ZuvviiGaming"
        >
          <Image width={39} height={39} src={twitter.src} alt="twitter link" />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.tiktok.com/@zuvviigaming?"
        >
          <Image width={39} height={39} src={tiktok.src} alt="tiktok link" />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.snapchat.com/add/zuvviigaming"
        >
          <Image
            width={39}
            height={39}
            src={snapchat.src}
            alt="snapchat link"
          />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.youtube.com/c/zuvvii"
        >
          <Image width={39} height={39} src={youtube.src} alt="youtube link" />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/Zuvvii-100527288199138"
        >
          <Image
            width={39}
            height={39}
            src={facebook.src}
            alt="facebook link"
          />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.reddit.com/user/Zuvvii-Gaming"
        >
          <Image width={39} height={39} src={reddit.src} alt="reddit link" />
        </a>
      </Box>
      <Link
        target="_blank"
        rel="noreferrer"
        sx={{
          gridArea: "C",
          color: "white",
          fontFamily: "Helvetica",
          justifySelf: "center",
        }}
        href="https://www.zuvvii.com/"
        underline="none"
      >
        © Zuvvii 2022 | Contact us
      </Link>
    </Box>
  );
}
