export const onRequest = async (context) => {
  return await context.env.auth_service.fetch(context.request);
};
