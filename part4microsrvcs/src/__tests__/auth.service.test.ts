import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../auth/auth.service";
import { AuthModule } from "./auth.module";


 describe('AuthService', () => {

    let authService: AuthService;
    const mockAuthService = {
        create: jest.fn(user => {
            return {
                email: 'admin'
            }
    })
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService],
            imports: [
                AuthModule
            ]
            
          })
          .overrideProvider(AuthService)
          .useValue(mockAuthService)
          .compile();
        
        authService = module.get<AuthService>(AuthService);
    });
    
    it('should be defined', async () => {
        expect(authService).toBeDefined();
    });

    it("calling getAllUsers", () => {
        expect(authService.getAllUsers).not.toEqual(null);
    })

    it("calling login", () => {
        expect(authService.login).not.toEqual(null);
    })

    it("calling create", () => {
        expect(authService.createUser).not.toEqual(null);
    })

    it("calling validate", () => {
        expect(authService.validateUser).not.toEqual(null);
    })

    it("calling generateToken", () => {
        expect(authService.generateToken).not.toEqual(null);
    })
});
