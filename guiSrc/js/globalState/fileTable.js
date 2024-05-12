import { defineStore } from 'pinia'

/**
 * 获取文件大小的格式化字符串
 * @protected
 * @param {number} size 文件大小
 * @returns {string}
 */
function getSize (size) {
    if (!isNaN(size)) {
        //kb
        size = size / 1024
        if (size < 1024) {
            return size.toFixed(0) + ' KB'
        }

        //mb
        size = size / 1024
        if (size < 1024) {
            return size.toFixed(0) + ' MB'
        }

        //gb
        size = size / 1024
        return size.toFixed(1) + ' GB'
    }
    return '0 KB'
}

function formatTimeText (seconds) {
    if (seconds === undefined) return ''
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = Math.floor(seconds % 60)

    const hoursText = hours > 0 ? `${hours} 时 ` : ''
    const minutesText = minutes > 0 ? `${minutes} 分 ` : ''

    return `${hoursText}${minutesText}${remainingSeconds} 秒`
}

function formatBitRateText (bitrate) {
    if (bitrate === undefined) return ''
    if (bitrate < 10000) {
        return `${Math.floor(bitrate)} b/s`
    }
    bitrate = bitrate / 1000
    if (bitrate < 10000) {
        return `${Math.floor(bitrate)} kb/s`
    }
    bitrate = bitrate / 1000
    if (bitrate < 10000) {
        return `${Math.floor(bitrate)} MB/s`
    }
    bitrate = bitrate / 1000
    return `${Math.floor(bitrate)} G/s`
}

export const fileTable = defineStore('fileTable', {
    state: () => ({
        encodeTable: [],
    }),
    actions: {
        /**
         * 添加文件到encodeTable
         */
        encodeTable_add (file) {
            let info = {
                path: file.path,
                name: file.basename,
                extension: file.fileExtension,
                size: getSize(file.size),
                duration: formatTimeText(file.duration),
                videoFormat: '',
                widthHeight: '',
                subtitle: false,
                chapter: false,
                tracks: []
            }

            //识别所有轨道
            let tracks = file.track
            for (const track of tracks) {
                if (track['@type'] === 'Text') {
                    info.subtitle = true
                }
                if (track['@type'] === 'Menu') {
                    info.chapter = true
                }
            }

            //单独信息轨道
            let generalTrack = file.track[0]
            if (generalTrack) {
                info.frameRate = Math.floor(Number(generalTrack['FrameRate']) * 10) / 10
                info.frameCount = generalTrack['FrameCount']
                info.overallBitRate = formatBitRateText(generalTrack['OverallBitRate'])
                info.encodedDate = generalTrack['Encoded_Date']
            }

            //第一条视频轨道
            let videoTrack = file.track[1]
            if (videoTrack) {
                info.videoFormat = videoTrack['Format']
                info.widthHeight = `${videoTrack['Width']}x${videoTrack['Height']}`
            }

            //循环每一条轨道
            let videoTrackCount = 0
            let audioTrackCount = 0
            let subtitleTrackCount = 0
            for (const track of tracks) {
                if (track['@type'] === 'General') continue
                if (track['@type'] === 'Video') {
                    videoTrackCount++
                    info.tracks.push({
                        type: track['@type'],
                        label: `${i18n(track['@type'].toLowerCase())} ${videoTrackCount}`,
                        bitDepth: `${track['BitDepth']} bit`,
                        bitRate: formatBitRateText(track['BitRate']),
                        chromaSubsampling: track['ChromaSubsampling'],
                        colorSpace: track['ColorSpace'],
                        default: track['Default'],
                        forced: track['Forced'],
                        displayAspectRatio: track['DisplayAspectRatio'],
                        duration: formatTimeText(track['Duration']),
                        codecID: track['CodecID'],
                        encodedLibrary: track['Encoded_Library'],
                        encodedLibrarySettings: track['Encoded_Library_Settings'],
                        format: track['Format'],
                        formatConfig: `profile: ${track['Format_Profile']}  ;  level: ${track['Format_Level']}  ;  tier: ${track['Format_Tier']}`,
                        frameCount: track['FrameCount'],
                        frameRate: `${track['FrameRate']} (${track['FrameRate_Num']}/${track['FrameRate_Den']}) FPS`,
                        frameRateMode: track['FrameRate_Mode'],
                        height: track['Height'],
                        width: track['Width'],
                        ID: track['ID'],
                        language: track['Language'],
                        pixelAspectRatio: track['PixelAspectRatio'],
                        streamSize: `${getSize(track['StreamSize'])} (${Math.floor(Number(track['StreamSize']) / file.size * 100)}%)`,
                    })
                }
                if (track['@type'] === 'Audio') {
                    audioTrackCount++
                    info.tracks.push({
                        type: track['@type'],
                        label: `${i18n(track['@type'].toLowerCase())} ${audioTrackCount}`,
                        bitRate: formatBitRateText(track['BitRate']),
                        channelLayout: track['ChannelLayout'],
                        channelPositions: track['ChannelPositions'],
                        channels: track['Channels'],
                        codecID: track['CodecID'],
                        compressionMode: track['Compression_Mode'],
                        default: track['Default'],
                        delay: track['Delay'],
                        delaySource: track['Delay_Source'],
                        duration: formatTimeText(track['Duration']),
                        forced: track['Forced'],
                        format: track['Format'],
                        formatAdditionalFeatures: track['Format_AdditionalFeatures'],
                        frameCount: track['FrameCount'],
                        frameRate: `${track['FrameRate']} FPS`,
                        ID: track['ID'],
                        language: track['Language'],
                        samplesPerFrame: track['SamplesPerFrame'],
                        samplingCount: track['SamplingCount'],
                        samplingRate: `${track['SamplingRate']} Hz`,
                        streamOrder: track['StreamOrder'],
                        streamSize: `${getSize(track['StreamSize'])} (${Math.floor(Number(track['StreamSize']) / file.size * 100)}%)`,
                    })
                }
                if (track['@type'] === 'Text') {
                    subtitleTrackCount++
                    info.tracks.push({
                        type: track['@type'],
                        label: `${i18n('subtitle')} ${subtitleTrackCount}`,
                        default: track['Default'],
                        duration: formatTimeText(track['Duration']),
                        forced: track['Forced'],
                        format: track['Format'],
                        codecID: track['CodecID'],
                        language: track['Language'],
                        streamSize: `${getSize(track['StreamSize'])} (${Math.floor(Number(track['StreamSize']) / file.size * 100)}%)`,
                    })
                }
                if (track['@type'] === 'Menu') {
                    let obj = {
                        type: track['@type'],
                        label: `${i18n('chapter')}`,
                        data: {}
                    }
                    let extra = track['extra']
                    Object.entries( extra ).forEach( ([key, value]) => {
                        obj.data[key.slice(1).replace(/_/g, ':')] = value
                    })

                    info.tracks.push(obj)
                }
            }

            //附件
            if (generalTrack['extra']) {
                let attachments = generalTrack['extra']['Attachments']
                if (attachments) {
                    info.tracks.push({
                        type: 'Attachments',
                        label: `${i18n('attachments')}`,
                        data: attachments.split(' / ')
                    })
                }
            }

            //格式化label
            for (const track of info.tracks) {
                if (videoTrackCount === 1 && track.type === 'Video') {
                    track.label = `${i18n('video')}`;
                }
                if (audioTrackCount === 1 && track.type === 'Audio') {
                    track.label = `${i18n('audio')}`;
                }
                if (subtitleTrackCount === 1 && track.type === 'Text') {
                    track.label = `${i18n('subtitle')}`;
                }
            }

            this.encodeTable.push(info)
        },
        encodeTable_clear () {
            this.encodeTable = []
        }
    },
})