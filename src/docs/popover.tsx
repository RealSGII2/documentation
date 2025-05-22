import { Product } from '@/app/components/docs/ProductPicker';
import { DocsLogo, TemperatureLogo } from './homepage';

export default function ProductPopover() {
    return (
        <>
            <h1>Select a project</h1>
            <Product href='/newdocs'>
                <DocsLogo />
                <div>
                    <h2>DocEngine</h2>
                    <p>This engine powering this website</p>
                </div>
            </Product>
            <Product href='/temperatures'>
                <TemperatureLogo />
                <div>
                    <h2>Temperatures</h2>
                    <p>Legend of Zelda inspired temperature system</p>
                </div>
            </Product>
            <Product href='/modules'>
                <TemperatureLogo />
                <div>
                    <h2>Roblox Modules</h2>
                    <p>Various modules of mine for Roblox</p>
                </div>
            </Product>
        </>
    );
}
