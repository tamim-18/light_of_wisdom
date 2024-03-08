import { MediaError } from '@mux/mux-video';
import type { DialogOptions, DevlogOptions } from './types';
export declare function getErrorLogs(error: MediaError, offline?: boolean, playbackId?: string, playbackToken?: string, translate?: boolean): {
    dialog: DialogOptions;
    devlog: DevlogOptions;
};
