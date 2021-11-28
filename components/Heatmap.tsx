import React, { useEffect, useRef, useState } from 'react';
import {
    differenceInDays,
    eachDayOfInterval,
    endOfWeek,
    endOfYear,
    format,
    getDay,
    startOfWeek,
    startOfYear
} from 'date-fns';
import * as d3 from 'd3';
import useMeasure from 'react-use-measure';

interface IDataSetAttribute {
    gutter: number;
    width: number;
    height: number;
    itemSize: number;
    labelPadding: number;
    transitionDuration: number;
}

interface ICalendarAttribute {
    data: string | Date;
    total: number;
}

const drawChat = (svgRef: React.RefObject<SVGSVGElement>, dataSet: IDataSetAttribute) => {
    let yearDate: ICalendarAttribute[] = [];

    const startYear = startOfYear(new Date());
    const endYear = endOfYear(new Date());
    const intervalDay = eachDayOfInterval({
        start: startYear,
        end: endYear
    });

    for (const tempDay of intervalDay) {
        yearDate.push({
            data: format(tempDay, 'yyyy-MM-dd'),
            total: 1
        });
    }

    // 每一天的总个数的最大值
    let maxValue = d3.max(yearDate, d => d.total) ?? 0;

    let color = d3.scaleLinear()
        // @ts-ignore
        .range(['#dddddd', '#10b981'])
        // @ts-ignore
        .domain([-0.15 * maxValue, maxValue]);

    let calcItemX = (d: ICalendarAttribute) => {
        let dayIndex = differenceInDays(new Date(d.data), startYear) + getDay(startYear);
        let colIndex = Math.trunc(dayIndex / 7);
        return colIndex * (dataSet.itemSize + dataSet.gutter) + dataSet.labelPadding;
    };

    let calcItemY = (d: ICalendarAttribute) => {
        return dataSet.labelPadding + getDay(new Date(d.data)) * (dataSet.itemSize + dataSet.gutter);
    };

    let calcItemSize = (d: ICalendarAttribute) => {
        if (maxValue <= 0) {
            return dataSet.itemSize;
        }
        return dataSet.itemSize * 0.75 + (dataSet.itemSize * d.total / maxValue) * 0.25;
    };

    const svg = d3.select(svgRef.current)
        .attr('class', 'svg');

    const items = svg.append('g');
    items.selectAll('.item-circle')
        .data(yearDate)
        .enter()
        .append('rect')
        .attr('class', 'item item-circle')
        .style('cursor', 'pointer')
        .style('opacity', 0)
        .attr('x', d => {
            return calcItemX(d) + (dataSet.itemSize - calcItemSize(d)) / 2;
        })
        .attr('y', d => {
            return calcItemY(d) + (dataSet.itemSize - calcItemSize(d)) / 2;
        })
        .attr('rx', d => {
            return calcItemSize(d);
        })
        .attr('ry', d => {
            return calcItemSize(d);
        })
        .attr('width', d => {
            return calcItemSize(d);
        })
        .attr('height', d => {
            return calcItemSize(d);
        })
        .attr('fill', d => {
            return (d.total > 0) ? color(d.total) : 'transparent';
        })
        .on('click', function (l, d) {
            console.log(d.data);
            d3.select(this)
                .transition()
                .duration(dataSet.transitionDuration)
                .ease(d3.easeLinear)
                .attr('x', () => {
                    return calcItemX(d) - (dataSet.itemSize * 1.2 - dataSet.itemSize) / 2;
                })
                .attr('y', () => {
                    return calcItemY(d) - (dataSet.itemSize * 1.2 - dataSet.itemSize) / 2;
                })
                .attr('width', dataSet.itemSize * 1.2)
                .attr('height', dataSet.itemSize * 1.2)
                .transition()
                .duration(dataSet.transitionDuration)
                .ease(d3.easeLinear)
                .attr('x', () => {
                    return calcItemX(d) + (dataSet.itemSize - calcItemSize(d)) / 2;
                })
                .attr('y', () => {
                    return calcItemY(d) + (dataSet.itemSize - calcItemSize(d)) / 2;
                })
                .attr('width', () => {
                    return calcItemSize(d);
                })
                .attr('height', () => {
                    return calcItemSize(d);
                });
        })
        .transition()
        .delay(() => {
            return (Math.cos(Math.PI * Math.random()) + 1) * dataSet.transitionDuration;
        })
        .duration(() => {
            return dataSet.transitionDuration;
        })
        .ease(d3.easeLinear)
        .style('opacity', 1);

    let monthLabels = d3.timeMonths(startYear, endYear);
    let monthScale = d3.scaleLinear()
        .range([0, dataSet.width])
        .domain([0, monthLabels.length]);

    // 月
    const labels = svg.append('g');
    labels.selectAll('.label-month')
        .data(monthLabels)
        .enter()
        .append('text')
        .attr('class', 'label label-month')
        .style('fill', 'rgb(170, 170, 170)')
        .attr('font-size', () => {
            return Math.floor(dataSet.labelPadding / 3) + 'px';
        })
        .text(d => {
            return d.toLocaleDateString('en-us', { month: 'short' });
        })
        .attr('x', (d, i) => {
            return monthScale(i) + (monthScale(i) - monthScale(i - 1)) / 2;
        })
        .attr('y', dataSet.labelPadding / 2);

    // 周
    const weekLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    let weekLabels = d3.timeDays(startOfWeek(new Date()), endOfWeek(new Date()));
    let weekScale = d3.scaleBand()
        .rangeRound([dataSet.labelPadding, dataSet.height])
        .domain(weekLabels.map(d => {
            return getDay(new Date(d)).toString();
        }));

    const weeks = svg.append('g');
    weeks.selectAll('.label-day').remove();
    weeks.selectAll('.label-day')
        .data(weekLabels)
        .enter()
        .append('text')
        .attr('class', 'label label-day')
        .style('cursor', 'pointer')
        .style('fill', 'rgb(170, 170, 170)')
        .attr('x', dataSet.labelPadding / 3)
        .attr('y', (d, i) => {
            // @ts-ignore
            return weekScale(i.toString()) + weekScale.bandwidth() / 1.75;
        })
        .style('text-anchor', 'left')
        .attr('font-size', () => {
            return Math.floor(dataSet.labelPadding / 3) + 'px';
        })
        .text(d => {
            return weekLetters[getDay(new Date(d))];
        });
};

const Heatmap: React.FC = () => {

    const [containerRef, bounds] = useMeasure();
    const svgRef = useRef<SVGSVGElement>(null);
    const [dataSet, setDataSet] = useState<IDataSetAttribute>(
        {
            gutter: 5,
            width: 1000,
            height: 200,
            itemSize: 10,
            labelPadding: 40,
            transitionDuration: 500
        }
    );

    useEffect(() => {
        if (bounds.width === 0) {
            return;
        }

        const startYear = startOfYear(new Date());
        const dayIndex = differenceInDays(endOfYear(new Date()), startYear) + getDay(startYear);
        const colIndex = Math.trunc(dayIndex / 7);
        const numWeeks = colIndex + 1;

        const width = bounds.width - 40;
        const itemSize = ((width - dataSet.labelPadding) / numWeeks - dataSet.gutter);
        const height = dataSet.labelPadding + 7 * (itemSize + dataSet.gutter);

        setDataSet({ width, itemSize, height, gutter: 5, labelPadding: 40, transitionDuration: 500 });

    }, [bounds.width, dataSet.gutter, dataSet.labelPadding]);

    useEffect(() => {


    }, []);

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr('width', dataSet.width)
            .attr('height', dataSet.height);
        svg.selectAll('g').remove();

        drawChat(svgRef, dataSet);
    }, [dataSet]);

    return (
        <div className="w-full h-full" ref={containerRef}>
            <svg ref={svgRef}/>
        </div>
    );
};

export default Heatmap;
