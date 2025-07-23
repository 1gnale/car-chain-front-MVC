

export default interface IBrandRepository {
    getBrands(): Promise<Brand[]>
}