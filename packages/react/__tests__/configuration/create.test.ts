import {generateBaseConfig} from "shared/lib/configuration";
import { create } from '../../lib/configuration/create';

/**
 * Mocked
 */
import prompts from 'prompts';
import { mocked } from 'jest-mock';

jest.mock('prompts', () => jest.fn());
jest.mock('shared/lib/configuration', () => ({
    generateBaseConfig: jest.fn()
}))
const mockedPrompts = mocked(prompts);
const mockedGenerateBaseConfig = mocked(generateBaseConfig);
/**
 * End Mocked
 */


describe('create CLI (React)', () => {
    const promptResult = {
        searchRoot: 'src',
        attributes: ['data-testid'],
        locationForFile: 'src'
    };

    beforeEach(() => {
        jest.resetAllMocks();
    })

    it('should call generateBaseConfig if prompts answered', async () => {
        mockedPrompts.mockResolvedValueOnce(promptResult)

        await create();

        expect(mockedPrompts).toBeCalled();

        expect(mockedGenerateBaseConfig).toBeCalledWith(promptResult);
    })

    it('should not call generateBaseConfig if prompts not answered', async () => {
        mockedPrompts.mockResolvedValueOnce(null as any);

        await create();

        expect(mockedPrompts).toBeCalled();

        expect(mockedGenerateBaseConfig).not.toBeCalled();
    })
})