import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
	let spectator: Spectator<TabsComponent>;
	const createComponent = createComponentFactory(TabsComponent);

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create the component', () => {
		expect(spectator.component).toBeTruthy();
	});

	it('should have default values', () => {
		expect(spectator.component.size).toBe('medium');
		expect(spectator.component.onlyIcon).toBeFalsy();
		expect(spectator.component.tabs).toEqual([]);
	});

	it('should set activeTab to the first tab if not defined', () => {
		spectator.setInput('tabs', [
			{ label: 'Tab 1', id: 1 },
			{ label: 'Tab 2', id: 2 },
		]);
		spectator.component.ngOnInit();
		expect(spectator.component.activeTab).toBe(1);
	});

	it('should set activeTab to the first active tab if not defined', () => {
		spectator.setInput('tabs', [
			{ label: 'Tab 1', id: 1 },
			{ label: 'Tab 2', id: 2, active: true },
		]);
		spectator.component.ngOnInit();
		expect(spectator.component.activeTab).toBe(2);
	});

	it('should emit activeTabChange event when activeTab is set', () => {
		jest.spyOn(spectator.component.activeTabChange, 'emit');
		spectator.component.activeTab = 2;
		expect(spectator.component.activeTabChange.emit).toHaveBeenCalledWith(2);
	});

	it('should update activeTab when selectedTab is called', () => {
		spectator.setInput('tabs', [
			{ label: 'Tab 1', id: 1 },
			{ label: 'Tab 2', id: 2 },
		]);
		spectator.component.selectedTab({ label: 'Tab 2', id: 2 });
		expect(spectator.component.activeTab).toBe(2);
	});

	it('should not change activeTab if the same tab is selected', () => {
		spectator.setInput('tabs', [
			{ label: 'Tab 1', id: 1 },
			{ label: 'Tab 2', id: 2 },
		]);
		spectator.component.activeTab = 1;
		spectator.component.selectedTab({ label: 'Tab 1', id: 1 });
		expect(spectator.component.activeTab).toBe(1);
	});
});
