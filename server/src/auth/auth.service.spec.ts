import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { describe } from 'node:test';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


describe('The Authentication Service', () => {
  let authencationService: AuthService;
  beforeEach(() => {
    authencationService = new AuthService(
      new UserService(new Repository<User>()),
      new JwtService({
        secretOrPrivateKey: '7A125D673E2D5E29'
      }),
      new ConfigService()
    );
    describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = 1;
      expect(
        typeof authenticationService.(userId)
      ).toEqual('string')
    })
  })
})
