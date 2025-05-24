export default interface MessageResponse<T = unknown> {
  message: string;
  code?: string;
  data?: T
}
