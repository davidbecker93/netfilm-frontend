import React, { forwardRef, useCallback, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import MaxLineTypography from "./MaxLineTypography";
import PlayButton from "./PlayButton";
import NetfilmIconButton from "./NetfilmIconButton";
import AgeLimitChip from "./AgeLimitChip";
import QualityChip from "./QualityChip";
import { formatMinuteToReadable, getRandomNumber } from "src/utils/common";
import SimilarVideoCard from "./SimilarVideoCard";
import { useDetailModal } from "src/providers/DetailModalProvider";
import {
  useGetAppendedVideosQuery,
  useGetSimilarVideosQuery,
} from "src/store/slices/discover";
import { MEDIA_TYPE } from "src/types/Common";
import { YoutubePlayer } from "./Player";
import { VideoJsPlayer } from "video.js";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// interface DetailModalProps {
//   detail: MovieDetail | null;
//   similarVideos: Movie[];
//   onClose: VoidFunction;
// }

export default function DetailModal() {
  const { detailType, setDetailType } = useDetailModal();
  const { data: detail } = useGetAppendedVideosQuery(
    { mediaType: detailType.mediaType, id: detailType.id ?? 0 },
    { skip: !detailType.id }
  );
  const { data: similarVideos } = useGetSimilarVideosQuery(
    { mediaType: detailType.mediaType, id: detailType.id ?? 0 },
    { skip: !detailType.id }
  );
  const playerRef = useRef<VideoJsPlayer | null>(null);
  const [muted, setMuted] = useState(true);

  const handleReady = useCallback((player: VideoJsPlayer) => {
    playerRef.current = player;
    setMuted(player.muted());
  }, []);

  const handleMute = useCallback((status: boolean) => {
    if (playerRef.current) {
      playerRef.current.muted(!status);
      setMuted(!status);
    }
  }, []);

  if (detailType.id) {
    return (
      <Dialog
        id="detail_dialog"
        fullWidth
        scroll="body"
        maxWidth="md"
        open={!!detail}
        onClose={() => {
          setDetailType({ mediaType: MEDIA_TYPE.Movie, id: null });
        }}
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ p: 0, bgcolor: "#181818" }}>
          <Box
            sx={{
              top: 0,
              left: 0,
              right: 0,
              position: "relative",
              mb: 3,
            }}
          >
            <Box
              sx={{
                top: -65,
                width: "100%",
                position: "relative",
                height: "calc(9 / 16 * 100%)",
              }}
            >
              <YoutubePlayer
                videoId={detail?.videos.results[0]?.key || "L3oOldViIgY"}
                options={{
                  autoplay: true,
                  controls: false,
                  loop: true,
                }}
                onReady={handleReady}
              />

              <Box
                sx={{
                  background: `linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)`,
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: "26.09%",
                  opacity: 1,
                  position: "absolute",
                  transition: "opacity .5s",
                }}
              />
              <Box
                sx={{
                  backgroundColor: "transparent",
                  backgroundImage:
                    "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#181818 68%,#181818)",
                  backgroundRepeat: "repeat-x",
                  backgroundPosition: "0px top",
                  backgroundSize: "100% 100%",
                  bottom: -30,
                  position: "absolute",
                  height: "15.7vw",
                  opacity: 1,
                  // top: "auto",
                  width: "100%",
                }}
              />
              <IconButton
                onClick={() => {
                  setDetailType({ mediaType: MEDIA_TYPE.Movie, id: null });
                }}
                sx={{
                  top: 75,
                  right: 15,
                  position: "absolute",
                  bgcolor: "#181818",
                  width: { xs: 22, sm: 40 },
                  height: { xs: 22, sm: 40 },
                  "&:hover": {
                    bgcolor: "primary.main",
                  },
                }}
              >
                <CloseIcon
                  sx={{ color: "white", fontSize: { xs: 14, sm: 22 } }}
                />
              </IconButton>
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: -65,
                  px: { xs: 2, sm: 3, md: 5 },
                }}
              >
                <MaxLineTypography variant="h3" maxLine={1} sx={{ mb: 2 }}>
                  <b>{detail?.title}</b>
                </MaxLineTypography>
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <PlayButton sx={{ color: "black", py: 0 }} />
                  <NetfilmIconButton>
                    <AddIcon />
                  </NetfilmIconButton>
                  <NetfilmIconButton>
                    <ThumbUpOffAltIcon />
                  </NetfilmIconButton>
                  <Box flexGrow={1} />
                  <NetfilmIconButton
                    size="large"
                    onClick={() => handleMute(muted)}
                    sx={{ zIndex: 2 }}
                  >
                    {!muted ? <VolumeUpIcon /> : <VolumeOffIcon />}
                  </NetfilmIconButton>
                </Stack>

                <Container
                  sx={{
                    p: "0px !important",
                  }}
                >
                  <Grid container spacing={5} alignItems="center">
                    <Grid item xs={12} sm={6} md={8}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "success.main" }}
                        >{`${getRandomNumber(100)}% Match`}</Typography>
                        <Typography variant="body2">
                          {detail?.release_date.substring(0, 4)}
                        </Typography>
                        <AgeLimitChip label={`${getRandomNumber(20)}+`} />
                        <Typography variant="subtitle2">{`${formatMinuteToReadable(
                          getRandomNumber(180)
                        )}`}</Typography>
                        <QualityChip label="HD" />
                      </Stack>

                      <MaxLineTypography
                        maxLine={3}
                        variant="body1"
                        sx={{ mt: 2 }}
                      >
                        {detail?.overview}
                      </MaxLineTypography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="body2" sx={{ my: 1 }}>
                        {`Genres : ${detail?.genres
                          .map((g) => g.name)
                          .join(", ")}`}
                      </Typography>
                      <Typography variant="body2" sx={{ my: 1 }}>
                        {`Available in : ${detail?.spoken_languages
                          .map((l) => l.name)
                          .join(", ")}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Box>
            {similarVideos && similarVideos.results.length > 0 && (
              <Container
                sx={{
                  py: 4,
                  px: { xs: 2, sm: 3, md: 5 },
                }}
              >
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  More Like This
                </Typography>
                <Grid container spacing={2}>
                  {similarVideos.results.map((sm) => (
                    <Grid item xs={6} sm={4} key={sm.id}>
                      <SimilarVideoCard video={sm} />
                    </Grid>
                  ))}
                </Grid>
              </Container>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
