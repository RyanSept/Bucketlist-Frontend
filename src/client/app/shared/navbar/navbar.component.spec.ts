import { NavbarComponent } from './navbar.component';
import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/auth.service';

export function main() {
    describe('NavbarComponent', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [ NavbarComponent ],
                providers: [ AuthenticationService, Router],
                    });
            
        });
        it('should redirect to search page with user query as param', () => {
            async(() => {
                TestBed.compileComponents().then(() => {
                    let navBarComponent = TestBed.get(NavbarComponent);
                    navBarComponent.queryString = "aString";
                    navBarComponent.search();
                    expect(navBarComponent.router.navigate).toHaveBeenCalledWith([navBarComponent.queryString]);
                });
            });
        });
    });
}