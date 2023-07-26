import * as request from 'supertest';
import {Test, } from '@nestjs/testing';
import {AppModule} from '../src/app.module';
import {INestApplication, Logger} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";


describe('App is working.', () => {
    let app: INestApplication;

    // user credentials
    let email: string;
    let super_admin_email: string;
    let admin_email: string;
    let student_email: string;
    let teacher_email: string;
    let password: string;
    let super_admin_access_token: string;
    let super_admin_refresh_token: string;
    let admin_access_token: string;
    let admin_refresh_token: string;
    let student_access_token: string;
    let student_refresh_token: string;
    let teacher_access_token: string;
    let teacher_refresh_token: string;

    let batch_id: number;
    let room_id: number;
    let course_id: number;
    jest.setTimeout(100 * 1000)
    beforeEach(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
            providers: [ConfigService]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        const env = moduleFixture.get(ConfigService);
        super_admin_email = env.get("super_admin_email")
        admin_email = env.get("admin_email")
        teacher_email = env.get("teacher_email")
        student_email = env.get("student_email")
        email = "test@gmail.com"
        password = env.get("password")
    });
    describe("Super User", () => {
        it("should be logged in as super admin", async () => {
            const payload = {
                email: super_admin_email,
                password: password
            }
            const res = await request(app.getHttpServer()).post('/auth/login')
                .send(payload)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(200);
            expect(res.body['access_token']).toBeDefined();
            expect(res.body['refresh_token']).toBeDefined();
            super_admin_refresh_token = res.body['refresh_token']
            super_admin_access_token = res.body['access_token']
        })
    })
    describe("User Creation", () => {
        it("should create a admin user", async () => {
            const payload = {
                email: admin_email,
                password: password,
                contact: "1234567890",
            }
            const res = await request(app.getHttpServer()).post('/auth/signup')
                .send(payload)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(201);
            expect(res.body['access_token']).toBeDefined();
        })
        it("should create an admin", async () => {
            const payload = {
                user_email: admin_email
            }
            const res = await request(app.getHttpServer()).post('/admin/add_admin')
                .send(payload)
                // @INFO : This line is important to pass the auth guard
                .set('Authorization', `Bearer ${super_admin_access_token}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.text).toEqual(`Admin with ${admin_email} is added.`);
        })
        it("should create a teacher user", async () => {
            const payload = {
                email: teacher_email,
                password: password,
                contact: "1234567890",
            }
            const res = await request(app.getHttpServer()).post('/auth/signup')
                .send(payload)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(201);
            expect(res.body['access_token']).toBeDefined();
        })
        it("should create a teacher", async () => {
            const payload = {
                user_email: teacher_email
            }
            const res = await request(app.getHttpServer()).post('/teacher/add_teacher')
                .send(payload)
                // @INFO : This line is important to pass the auth guard
                .set('Authorization', `Bearer ${super_admin_access_token}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.text).toEqual(`Teacher with ${teacher_email} is added.`);
        })
        it("should create a student user", async () => {
            const payload = {
                email: student_email,
                password: password,
                contact: "1234567890",
            }
            const res = await request(app.getHttpServer()).post('/auth/signup')
                .send(payload)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(201);
            expect(res.body['access_token']).toBeDefined();
        })
    })
    describe("Authentication", () => {
        it("should be logged in as admin", async () => {
            const payload = {
                email: admin_email,
                password: password
            }
            const res = await request(app.getHttpServer()).post('/auth/login')
                .send(payload)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(200);
            expect(res.body['access_token']).toBeDefined();
            admin_refresh_token = res.body['refresh_token']
            admin_access_token = res.body['access_token']
        })
        it("should be logged in as teacher", async () => {
            const payload = {
                email: teacher_email,
                password: password
            }
            const res = await request(app.getHttpServer()).post('/auth/login')
                .send(payload)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(200);
            expect(res.body['access_token']).toBeDefined();
            teacher_refresh_token = res.body['refresh_token']
            teacher_access_token = res.body['access_token']
        })
        it("should be logged in as student", async () => {
            const payload = {
                email: student_email,
                password: password
            }
            const res = await request(app.getHttpServer()).post('/auth/login')
                .send(payload)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(200);
            expect(res.body['access_token']).toBeDefined();
            student_refresh_token = res.body['refresh_token']
            student_access_token = res.body['access_token']
        })
        // it("Should renew access token",async ()=>{
        //     const payload={
        //         refresh_token:student_refresh_token
        //     }
        //     const res = await request(app.getHttpServer()).post('/auth/renew_access_token')
        //         .send(payload)
        //         .set('Content-Type', 'application/json')
        //         .set('Accept', 'application/json');
        //     Logger.error(res.text)
        //     expect(res.text).toBeDefined();
        //     expect(res.status).toEqual(201);
        //     student_access_token=res.text
        // })
    })
    describe("User CRUD", () => {
        it("should create a user", async () => {
            const payload = {
                email: email,
                password: password,
                contact: "01700000000",
            }
            const res = await request(app.getHttpServer()).post('/auth/signup')
                .send(payload)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(201);
        })
        it("should read a user", async () => {

            const res = await request(app.getHttpServer()).get('/user/me')
                // @INFO : This line is important to pass the auth guard
                .set('Authorization', `Bearer ${super_admin_access_token}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(200);
            expect(res.body['email']).toEqual(super_admin_email);
        })
        it("should update a update", async () => {
            const payload = {
                name: "test name",
                contact: "01700000001",
                address: "test address",
            }
            const res = await request(app.getHttpServer()).post('/user/update')
                .send(payload)
                // @INFO : This line is important to pass the auth guard
                .set('Authorization', `Bearer ${student_access_token}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(200);
        })
        it("should delete a user", async () => {
            const payload = {
                user_email: email
            }
            const res = await request(app.getHttpServer()).post('/auth/delete_account')
                .send(payload)
                // @INFO : This line is important to pass the auth guard
                .set('Authorization', `Bearer ${super_admin_access_token}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.text).toEqual(`User with ${email} is deleted.`);
        })
    })
    describe("User Deletion", () => {
        it("should delete student user", async () => {
            const payload = {
                user_email: student_email
            }
            const res = await request(app.getHttpServer()).post('/auth/delete_account')
                .send(payload)
                // @INFO : This line is important to pass the auth guard
                .set('Authorization', `Bearer ${student_access_token}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.text).toEqual(`User with ${student_email} is deleted.`);
        })
        it("should delete teacher", async () => {
            const payload = {
                user_email: teacher_email
            }
            const res = await request(app.getHttpServer()).post('/teacher/remove_teacher')
                .send(payload)
                // @INFO : This line is important to pass the auth guard
                .set('Authorization', `Bearer ${admin_access_token}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.text).toEqual(`Teacher with ${teacher_email} is removed.`);
        })
        it("should delete teacher user", async () => {
            const payload = {
                user_email: teacher_email
            }
            const res = await request(app.getHttpServer()).post('/auth/delete_account')
                .send(payload)
                // @INFO : This line is important to pass the auth guard
                .set('Authorization', `Bearer ${teacher_access_token}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.text).toEqual(`User with ${teacher_email} is deleted.`);
        })
        it("should delete an admin", async () => {
            const payload = {
                user_email: admin_email
            }
            const res = await request(app.getHttpServer()).post('/admin/remove_admin')
                .send(payload)
                // @INFO : This line is important to pass the auth guard
                .set('Authorization', `Bearer ${super_admin_access_token}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.text).toEqual(`Admin with ${admin_email} is removed.`);
        })
        it("should delete admin user", async () => {
            const payload = {
                user_email: admin_email
            }
            const res = await request(app.getHttpServer()).post('/auth/delete_account')
                .send(payload)
                // @INFO : This line is important to pass the auth guard
                .set('Authorization', `Bearer ${admin_access_token}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.text).toEqual(`User with ${admin_email} is deleted.`);
        })

    })
    afterAll(async () => {
        await app.close();
    });
});