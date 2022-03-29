import { Container } from '../../../../src/container';
import { PartService } from '../../../../src/domain/services/part-service';

describe('Part service test', () => {
  const partService = Container.get<PartService>('part.service');
  test('Test add part ', () => {
    // ARANGE
    const mockedAdd = jest.fn(partService.addPart);
    // ACT
    mockedAdd('test', 'RUBBER', 5, 20, 50, 100);
    // ASSERT
    expect(mockedAdd).toBeCalledWith('test', 'RUBBER', 5, 20, 50, 100);
  });
  test('Test update', () => {
    // ARANGE
    const mockedUpdate = jest.fn(partService.update);
    // ACT
    mockedUpdate();
    // ASSERT
    expect(mockedUpdate).toBeCalled();
  });
});
