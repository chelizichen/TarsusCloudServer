class TarsusCloudError extends Error {
    public err:string
    constructor(err:any) {
        super(err.message);
        this.err = err;
    }
}
export const OutTimeError = () => new TarsusCloudError({ code: -1, message: 'OutTimeError Error' })
