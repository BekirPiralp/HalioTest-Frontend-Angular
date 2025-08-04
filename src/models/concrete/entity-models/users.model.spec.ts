import { UsersModel } from './users.model';

describe('UsersModel', () => {
  it('should create an instance', () => {
    expect(new UsersModel(0,"","","","","")).toBeTruthy();
  });
});
