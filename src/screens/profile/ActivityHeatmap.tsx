import { heatmapWeeks, heatmapDayLabels } from '@/data/heatmap';

/** Placeholder activity calendar — columns are weeks, rows are weekdays. */
export function ActivityHeatmap() {
  return (
    <section className="profile-section">
      <div className="profile-section__head">
        <h2 className="profile-section__title">Activity</h2>
        <span className="profile-section__count">last 16 weeks</span>
      </div>
      <div className="heatmap">
        <div className="heatmap__days" aria-hidden="true">
          {heatmapDayLabels.map((d, i) => (
            <span key={d} className="heatmap__day-label">
              {i % 2 === 0 ? d : ''}
            </span>
          ))}
        </div>
        <div className="heatmap__grid" role="img" aria-label="Practice activity over the last 16 weeks">
          {heatmapWeeks.map((week, w) => (
            <div className="heatmap__week" key={w}>
              {week.map((day, d) => (
                <span
                  key={d}
                  className="heatmap__cell"
                  data-intensity={day.intensity}
                  title={`${day.label}: ${day.intensity === 0 ? 'no' : day.intensity * 25 + '%'} activity`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="heatmap__legend" aria-hidden="true">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((n) => (
            <span key={n} className="heatmap__cell" data-intensity={n} />
          ))}
          <span>More</span>
        </div>
      </div>
    </section>
  );
}
