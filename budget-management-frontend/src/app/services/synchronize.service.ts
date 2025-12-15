import { Injectable } from '@angular/core';
import { PersistenceService } from './persistence.service';
import { StoreService } from './store.service';
import { Utils } from '../Utils/Utils';
import { StoreUtilsService } from './store-utils.service';

@Injectable({
    providedIn: 'root',
})
export class SynchronizeService {
    constructor(
        private _persistence: PersistenceService,
        private _store: StoreService,
        private _storeUtils: StoreUtilsService,
    ) {}

    globalSynchronize() {
        this.synchronizeBudgetItems();
        this.synchronizeExpenses();
    }

    synchronizeBudgetItems() {
        // retrieve all local budget items without defined ids
        const localBudgetItems = this._store.localBudgetItems?.filter((b) => !b.id);

        if (Utils.isEmpty(localBudgetItems)) return;

        this._persistence.addBudgetItems(localBudgetItems).subscribe({
            next: (synchronized) => {
                if (Utils.isNotEmpty(synchronized)) {
                    const completeBudgetItems = [...this._store.budgetItems, ...synchronized];

                    const newBudgetItems = this._storeUtils.filterBudgetItemsByDateRange(completeBudgetItems, this._store.expensesDateRange);

                    // TODO FILTER
                    this._store.budgetItems$.next(newBudgetItems);
                }
            },
            error: (error) => {
                console.error('Unexpected acquisition error:', error);
            },
        });
    }

    synchronizeExpenses() {}
}
