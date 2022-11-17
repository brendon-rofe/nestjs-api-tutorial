import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const ModuleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = ModuleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'b1@gmail.com',
      password: 'pass123',
    };
    describe('Signup', () => {
      it('should throw, if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw, if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('should throw, if no body provided empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(400);
      });
    });

    it('should signup', () => {
      return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201);
    });
  });

  describe('Signin', () => {
    const dto: AuthDto = {
      email: 'b1@gmail.com',
      password: 'pass123',
    };

    it('should throw, if email empty', () => {
      return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          password: dto.password,
        })
        .expectStatus(400);
    });

    it('should throw, if password empty', () => {
      return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: dto.email,
        })
        .expectStatus(400);
    });

    it('should throw, if no body provided empty', () => {
      return pactum
        .spec()
        .post('/auth/signin')
        .expectStatus(400);
    });

    it('should signin', () => {
      return pactum
        .spec()
        .post('/auth/signin')
        .withBody(dto)
        .expectStatus(200)
        .stores('userAt', 'access_token')
    });
  });
});

describe('User', () => {
  const dto: AuthDto = {
    email: 'b1@gmail.com',
    password: 'pass123',
  };
  describe('Get me', () => {
    it('should get current user', () => {
      return pactum
        .spec()
        .get('/users/me')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(undefined)
    })
  });

  describe('Edit user', () => {});
});

describe('Bookmarks', () => {
  describe('Create bookmark', () => {});

  describe('Get bookmarks', () => {});

  describe('Get bookmark by id', () => {});

  describe('Edit bookmark', () => {});

  describe('Delete bookmark', () => {});
});
