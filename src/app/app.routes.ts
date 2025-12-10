import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
        loadRemoteModule({
            remoteName: 'products',
            exposedModule: './Component',
        }).then((m) => {
            return m.App; 
        }),
    },
];
