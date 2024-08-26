export interface task {
  name: string;
  description: string;
}

export interface statusTask extends task {
  status: String;
}
