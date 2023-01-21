const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABnJJREFUeF7tm2XIbEUYx3/X7tYPoqJ+MLED7MYCCwM7EVGwFRO7O/AqFnYrBjZ2g4mFXRio2J389KycO87umTnn7HlfuPf5tOzOE/OfeOaJHcN4TmPG8/nTFQCTAnMBcwCzFaB/B3wEvAd8P1ILMUwAlgI2BVYC/DxFn0n+AbwOPAbcCjwA/NIVIG0DMBWwHbA3MH/NSXwBXAycW+yQmmLS2NoCYCJgG+AEYPY01ZWjfipAOBb4tnJ0zQFtAOC5vhxYraYNVWwfArsA91YNrPN7UwBWBW4CZqqjPIPnL+Ao4GjAz61REwA2L1Z+8gHW/Ak8Uqze08AbwFfAD8DMhWdYGlgDWA+YtmJmVwPbA7+3hUBdADYEbgQm6WOILu584BzALZxCXqBbA4cAcw9guB7YEhDcxlQHgGWBhwe4NQ3UC3xS0zqBOBg4AOi3u04H9qspfxy2XAA868/2WSF99+7AJW0YBiwM3DFgN7gLrm2qKxeAS4EdIkp/BDwW9zc1KODXpd4JLBaR+zWwaMYRi5qWA4AvOrd+yOOFtAFwV8uT74mbHngSWDAi3+O2RRO9OQA8BKwSUXYQcFITIxJ4FwKeAaYOxuoSVwSeSJDRaAcsDzwekeDKaEArN3LFJHxiXxYZc1tx/GphkLoDYmdf9JcpLsVayjOZtNVd4LuhTII/H/B2prx/hqcAMCXwWeSRcjewbh2lDXjWLzxDKOIw4Lg6clMA8JUWu903AW6po7Qhz/PA4oEMv1uyjtwUAI4BRLhMPmV9E/xaR2lDHh9IJ0eOgU9rXWMWpQBgkkI3VyYjs7WzNLU3eBHgpYg4j6PHMotSAHgNWCCQegpwYESTwcyewDzAfcB1Wdb8GwxV8Zt7MKCaLpC9F3B2pr6kS/DLSLjrk3dsoMzASLdYvqUNbEySpFAO/3PAEoHQM4F9UhSVx6TsAN/4kwWCzf5cFXzne+DR4DsDotQMUQ6/z+PQAxmD7DwMAGIJCHMBNwTKNgN8moaUArI8OfwmYfRCZTIwMkDKohTjRiMAAi1gZXJBXJgsmgBAAlwTdkAEpJG+A0blEfBW9nYukyWvqkRnb3wO/6gEwKfxW8CMJQRyEhY5/KMSAOdt1ugsYF7gHmAPwFJXKqXydwpA6kModZJtjOsUgNhTeDfggjZmUlNGpwC8G0lNm7c/McN4Q1XrCdNEeD4GrBrlVHs6BcCE43KB4ZavLVim0MpF3X+GAYNNda0JWFFKoU4BMMjYMbBKUFZIsRR4oU9eP2Q/FDg+UWanABj3h2lva/e6u5ROjm8isXtsnjm7qlMALIE/GLHY7y2UVJFBiq0yVWRwY8E1hToFwAKlGRizw2U6Ddg/wdpZiuTJOgMuQTM5OcWVTgFwjuYA1woma7LDzq+c2zsBr6QhnQNgpuWiiGkbFTd8ktUtDuocAAuUrnh4DJ6KuMgW59lXlMnWMPlhlijlrhlHaEpCpMdgI9S2EZNqpaMboqTH2CmQYfEmPKaVanIAsDz9MmBaukxGgObqf67U1t6AM4oulLJEM8U2ZGZRDgAKvhnYOKLBXr7DszQ3G3wkcEQg4v2K3qKoxlwALJC8GEmTW6F1+9nm2gX5DL8wUGSZzrsqayfmAqBOq7AWPEKygmwfwTsdIGBgZQAVkrWFWB9DX5PqAGAXl+ct1gvsfaARgjFM0gbbZycOlFg4PTVHcR0AlG/Tki4w1gFu57eF0w9yDKkx9hXA1pky3R4p5A4UXRcAhcbOYU+Z/wOwa8ydMiyyRO6Kl8l7wN7lz1OVNgFAHd7+hrExMlK0mfG8tvt7C2WxWqI/7QvoJpOoKQDy2xK76wBtRowmR92ybZLn39fprIFQ3yr2DyY1VTcFQN3KcDsOigx/A64o0mhvtoiCpXfb9EKydzBWqP3fwDYA6Al16xnS9mugdpx/j7GL40rA9jY7TJuQ512363+SymQe0wuy8k3QJgAaYP7vmsSeAO8IPYlH5NWilf7TIi+Y8ycq+xS2iqCYlLhtGwDt8EzarREzqslq5/LayKW7Htg/OAwAeoauXvTs2PU9UlT5LhgmAE7ayNHgSVcZ9vR0AYq7IFaL+E/3sAEoT9I4wd4ib+hh/8eop1eXaKjel7oEoGeEXsJgxiNiMdQ8w5xD2A4WWexvtMt9VAEQM8ZtakXZ3j/7CQZu2wSwdH8Wb6xrDqSR2AFVNnX6+3gPwN8muUlQ9LRlXwAAAABJRU5ErkJggg=='
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);