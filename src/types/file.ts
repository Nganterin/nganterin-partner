interface UploadedFileType {
  status: number;
  message: string;
  data: {
    id: string;
    public_url: string;
    original_file_name: string;
    size: string;
  };
}
