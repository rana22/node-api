interface IFileService {
    sign(_fileName: string, _fileType: string) : Promise<Object>;
}

export = IFileService;