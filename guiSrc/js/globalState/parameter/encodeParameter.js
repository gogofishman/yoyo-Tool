import { defineStore } from 'pinia'

const encodePreset = {
    default:{

    }
}

export const encodeParameter = defineStore('encodeParameter', {
    state: () => ({
        currentPreset: 'default',
        output_save_in_the_source_folder : true,
        output_overwrite_source_file :true,
        output_folder : '',
        output_suffix : '_encoded',
    }),
    actions: {
        save(){
            console.log(this)
        }
    },
})