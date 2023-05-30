import React from "react";

import { GetServerSideProps } from "next";

import Layout from "components/layout";
import SingleClip from "components/clip/SingleClip";

import http from "services/http-common";
import { IVideo } from "types/interfaces";

interface ClipProps {
  clipId: string;
  videoData: IVideo | null
}

const Clip = ({
  clipId,
  videoData
}: ClipProps) => {
  return (
    <Layout pageTitle='CLIP - ZUVVII GAMING' type='single'>
      <SingleClip 
        clipId={clipId}
        videoData={videoData}
      />
    </Layout>
  )
};

export const getServerSideProps: GetServerSideProps<
  any
> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true
    }
  }

  const { clipId } = params

  try {
    const res: any = await http.get(
      `/items/${clipId}`
    )

    return {
      props: {
        clipId: clipId && !Array.isArray(clipId) ? clipId : '',
        videoData: res.data
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

export default Clip;



