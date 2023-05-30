import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { XboxVideo } from "../../../common/xboxVideos";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<XboxVideo[]>
) {
  const { username } = req.query;

  if (typeof username !== "string") return res.status(400).end();

  const key = await getKey(username);

  if (!key) return res.status(400).end();

  const { gameClips } = await getVideos(key);

  return res.status(200).json(gameClips);
}

const getKey = async (username: string) => {
  const url = `https://xbl.io/api/v2/friends/search/?gt=${username}`;

  const { data } = await axios.get(url, {
    headers: {
      "X-Authorization": process.env.XBOX_API_KEY!,
    },
  });

  return data?.profileUsers?.[0]?.id;
};

const getVideos = async (xboxId: string) => {
  const url = `https://xbl.io/api/v2/dvr/gameclips/?xuid=${xboxId}`;

  const { data } = await axios.get(url, {
    headers: {
      "X-Authorization": process.env.XBOX_API_KEY!,
    },
  });

  return data;
};
