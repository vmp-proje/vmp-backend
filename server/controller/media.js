import ytdl from 'ytdl-core'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import readline from 'readline'
import path from 'path'
import { Media } from '../model/Media'

export const returnToVideo = async(req, res) => {

    if(!req.body) {
        return res.status(400).send({
            status: 'failure',
            message: 'empty_body'
        })
    }
    const videoUrl = req.body.videoUrl
    const isUrlValid = ytdl.validateURL(videoUrl)

    if (!isUrlValid) {
        return res.status(400).send({
            status: 'failure',
            message: 'invalid_url'
        })
    }

    const stream =  ytdl(videoUrl,{
        quality: 'lowestaudio'
    })
    const videoId = ytdl.getVideoID(videoUrl)
    const thumbnail = "https://img.youtube.com/vi/"+ videoId+"/hqdefault.jpg"
    const pathToSave = "././public/medias/"+videoId+".mp3"

    let duration
    let title
    let video_id
    await ytdl.getBasicInfo(videoUrl, (err, info) => {
        if(err) {
            console.log(err)
        }
        duration = parseInt(info.length_seconds)
        title = info.title
        video_id = info.video_id
    })

    let media
    try {
        media = await Media({
            title: title,
            duration: duration,
            thumbnail: thumbnail,
            path: pathToSave
        }).save()
    } catch(e) {
        return res.status(500).send({
            status:'failure',
            message: 'server_error'
        })
    }

    ffmpeg.setFfmpegPath(ffmpegPath.path)
    const start = Date.now()
    ffmpeg(stream)
    .audioBitrate(128)
    .save(pathToSave)
    .on('progress', p => {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${p.targetSize}kb downloaded`);
    })
    .on('end', () => {
        console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
        return res.status(200).send({
            status: 'ok',
            data: {
                url: 'http://1db7aed7.ngrok.io/' + videoId + '.mp3',
                title: media.title,
                duration: media.duration,
                thumbnail: media.thumbnail,
                videoId: video_id
            }
        })
    })
    .on('error', err => {
        console.log(err)
    })

}