export class DynamoDB {
    constructor({ endpoint, ...config }: {
        accessKeyId: string;
        secretAccessKey: string;
        sessionToken?: string;
        service?: string;
        region?: string;
        cache?: Map<string, ArrayBuffer>;
        retries?: number;
        initRetryMs?: number;
        endpoint: string;
    });
    _client: any;
    _endpoint: string;
    util: {
        abort: {};
        each: (object: any, iterFunction: any) => void;
        copy: (object: any) => any;
        lowerFirst: (string: any) => any;
    };
    defineMethods(): void;
    _call(target: any, params: any, cb: any): any;
}
