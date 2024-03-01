import { Container } from 'brandi';
import { JwtGenerator, TOKEN_GENERATOR_FACTORY_TOKEN, TOKEN_GENERATOR_TOKEN } from './token-generator';

export async function bindToContainer(container: Container): Promise<void> {
    container.bind(TOKEN_GENERATOR_FACTORY_TOKEN).toFactory(JwtGenerator.New);
    const tokenGenerator = await container.get(TOKEN_GENERATOR_FACTORY_TOKEN)();
    container.bind(TOKEN_GENERATOR_TOKEN).toConstant(tokenGenerator);
}
