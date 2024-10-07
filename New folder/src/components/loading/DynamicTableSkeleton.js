import ShimmerLoading from "components/loading/ShimmerLoading";

const DynamicTableSkeleton = ({ numRows = 5, numColumns = 3 }) => {
    const renderShimmerRow = () => (
        <tr>
            {[...Array(numColumns)].map((_, colIndex) => (
                <td key={colIndex}>
                    <ShimmerLoading height={16} width="100%" borderRadius={0} theme="dark" />
                </td>
            ))}
        </tr>
    );

    return (
        <>
            {[...Array(numRows)].map((_, rowIndex) => (
                renderShimmerRow(rowIndex)
            ))}
        </>
    );
};

export default DynamicTableSkeleton;