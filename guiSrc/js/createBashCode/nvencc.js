const defaultArgs = [
    '--preset', 'P7',
    // '--log', `${appInfo.appDir}/data/log/nvencc.log`, '--log-opt', 'addtime=true',
    '--thread-throttling', 'all=off',
]

export default function (data) {
    let args = []
    args.push('-c', data.codec)
    args.push('--qvbr', data.quality)
    args.push('--output-depth', data.depth)
    args.push('--output-csp', data.color_space)
    args.push('--lookahead', data.lookahead)
    if (data.lossless) args.push('--lossless')
    if (data.gop != -1) {
        args.push('--strict-gop')
        args.push('--gop', data.gop)
    }
    if (data.aq != -1) {
        args.push('--aq')
        args.push('--aq-strength', data.aq)
    }

    //音频
    if (data.audio_codec === 'copy') {
        args.push('--audio-codec', 'copy')
    } else {
        args.push('--audio-codec', data.audio_codec)
        args.push('--audio-bitrate', data.audio_bitrate)
        args.push('--audio-samplerate', data.audio_samplerate)
        if (data.audio_channel !== 'copy') {
            args.push('--audio-stream', ':' + data.audio_channel)
        }
    }

    if (data.chapter_copy) args.push('--chapter-copy')
    if (data.key_on_chapter) args.push('--key-on-chapter')
    if (data.change_resolution) {
        args.push('--output-res', data.resolution)
        args.push('--vpp-resize', data.scale_mode)
        let sar = data.sar.split(':')
        if (sar[0] != 1 || sar[1] != 1) {
            args.push('--sar', `${sar[0]}:${sar[1]}`)
        }
    }
    if (data.encode_sub) {
        if (data.encode_sub_mode === 'inTheSameDirectory') {
            //
        } else if (data.encode_sub_mode === 'inVideoFile') {
            args.push('--vpp-subburn', 'track=1')
        }
    }
    if (data.vfr) args.push('--vpp-mpdecimate')

    return args.concat(defaultArgs)
}