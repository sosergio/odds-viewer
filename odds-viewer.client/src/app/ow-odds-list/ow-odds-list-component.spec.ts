
import{OwOddsListComponent} from './ow-odds-list-component';
import{OddsService} from '../services/odds-service';

beforeEach(() => {
    let mockOddService:OddsService;
    let component:OwOddsListComponent;
    this.component = new OwOddsListComponent(mockOddService);
    
    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });
});