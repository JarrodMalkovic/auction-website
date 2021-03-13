export const socketIOWrapper = {
  of: jest.fn().mockImplementation((namespace: string) => ({
    to: jest.fn().mockImplementation((listingSlug: string) => ({
      emit: jest.fn().mockImplementation((event: string, data: any) => {}),
    })),
  })),
};
