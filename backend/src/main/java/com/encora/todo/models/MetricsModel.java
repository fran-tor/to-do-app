package com.encora.todo.models;

public class MetricsModel {
  
    private long pages;
    private long avgTime;
    private long avgTimeLow;
    private long avgTimeMedium;
    private long avgTimeHigh;

    public long getPages() {
        return pages;
    }

    public void setPages(long pages) {
        this.pages = pages;
    }

    public long getAvgTime() {
        return avgTime;
    }

    public void setAvgTime(long avgTime) {
        this.avgTime = avgTime;
    }

    public long getAvgTimeLow() {
        return avgTimeLow;
    }

    public void setAvgTimeLow(long avgTimeLow) {
        this.avgTimeLow = avgTimeLow;
    }

    public long getAvgTimeMedium() {
        return avgTimeMedium;
    }

    public void setAvgTimeMedium(long avgTimeMedium) {
        this.avgTimeMedium = avgTimeMedium;
    }

    public long getAvgTimeHigh() {
        return avgTimeHigh;
    }

    public void setAvgTimeHigh(long avgTimeHigh) {
        this.avgTimeHigh = avgTimeHigh;
    }
}
